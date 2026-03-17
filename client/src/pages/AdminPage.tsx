import { useEffect, useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import {
  adminDeleteRegistration,
  adminGetStats,
  adminListRegistrations,
  getAdminKey,
  setAdminKey,
  SERVER_ORIGIN,
  type Registration,
} from '../services/api';
import { AlertCircle, Search, Shield, Trash2 } from 'lucide-react';

type Stats = { total: number };

function getAxiosMessage(err: unknown, fallback: string) {
  const e = err as AxiosError<{ error?: unknown }> | undefined;
  const msg = e?.response?.data?.error;
  return typeof msg === 'string' && msg.trim() ? msg : fallback;
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: 'slate' | 'amber' | 'green' | 'red' }) {
  const toneClass =
    tone === 'amber'
      ? 'border-amber-500/20 bg-amber-500/10 text-amber-200'
      : tone === 'green'
        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200'
        : tone === 'red'
          ? 'border-rose-500/20 bg-rose-500/10 text-rose-200'
          : 'border-slate-700/50 bg-slate-900/40 text-slate-200';

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <div className="text-sm opacity-90">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function fileUrl(meta?: { url?: string }) {
  const u = meta?.url;
  if (!u || typeof u !== 'string' || u === 'N/A') return '';
  return u.startsWith('http') ? u : `${SERVER_ORIGIN}${u}`;
}

export default function AdminPage() {
  const [adminKeyInput, setAdminKeyInput] = useState(() => getAdminKey());
  const [authed, setAuthed] = useState(() => Boolean(getAdminKey()));

  const [stats, setStats] = useState<Stats | null>(null);
  const [items, setItems] = useState<Registration[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryParams = useMemo(() => {
    return {
      page,
      limit: 25,
      q: q.trim() ? q.trim() : undefined,
    };
  }, [page, q]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [s, list] = await Promise.all([adminGetStats(), adminListRegistrations(queryParams)]);
      setStats(s);
      setItems(list.items);
      setTotalPages(list.totalPages || 1);
    } catch (e: unknown) {
      setError(getAxiosMessage(e, 'Failed to load admin data'));
      setStats(null);
      setItems([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authed) return;
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, queryParams]);

  const onLogin = async () => {
    setAdminKey(adminKeyInput.trim());
    setAuthed(Boolean(adminKeyInput.trim()));
    setPage(1);
  };

  const onLogout = () => {
    setAdminKey('');
    setAdminKeyInput('');
    setAuthed(false);
    setStats(null);
    setItems([]);
    setError(null);
  };

  const deleteOne = async (id: string) => {
    const ok = window.confirm('Delete this registration? This cannot be undone.');
    if (!ok) return;
    setLoading(true);
    setError(null);
    try {
      await adminDeleteRegistration(id);
      await refresh();
    } catch (e: unknown) {
      setError(getAxiosMessage(e, 'Failed to delete registration'));
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-[2rem] border border-slate-700/50 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="text-xl font-bold">Admin</div>
              <div className="text-sm text-slate-400">Enter the admin key to continue.</div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <label className="text-sm font-semibold text-slate-200">Admin key</label>
            <input
              value={adminKeyInput}
              onChange={(e) => setAdminKeyInput(e.target.value)}
              placeholder="ADMIN_API_KEY"
              className="w-full rounded-2xl bg-slate-950/40 border border-slate-700/60 px-4 py-3.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              type="password"
            />
            <button
              onClick={() => void onLogin()}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              Sign in
            </button>
            <div className="text-xs text-slate-500">
              Server checks the key from the <span className="font-mono text-slate-400">x-admin-key</span> header.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="text-3xl font-extrabold tracking-tight">Admin Dashboard</div>
          <div className="text-slate-400 mt-1">Teams registered, member details, and PPT review.</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => void refresh()}
            className="rounded-xl border border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60 px-4 py-2.5 text-sm font-semibold transition-colors"
            disabled={loading}
          >
            Refresh
          </button>
          <button
            onClick={onLogout}
            className="rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/15 px-4 py-2.5 text-sm font-semibold text-rose-200 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Teams registered" value={stats?.total ?? 0} tone="slate" />
      </div>

      <div className="mt-10 rounded-3xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-2xl overflow-hidden">
        <div className="p-5 md:p-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, email, team, phone…"
                className="pl-9 pr-4 py-2.5 rounded-2xl bg-slate-950/40 border border-slate-700/60 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-[min(24rem,80vw)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1 || loading}
              className="rounded-xl border border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60 px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Prev
            </button>
            <div className="text-sm text-slate-400">
              Page <span className="text-slate-200 font-semibold">{page}</span> / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages || loading}
              className="rounded-xl border border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60 px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-950/40 border-y border-slate-800">
              <tr className="text-left text-slate-300">
                <th className="px-6 py-3.5 font-semibold">Leader</th>
                <th className="px-6 py-3.5 font-semibold">Members</th>
                <th className="px-6 py-3.5 font-semibold">Track</th>
                <th className="px-6 py-3.5 font-semibold">PPT</th>
                <th className="px-6 py-3.5 font-semibold">Payment</th>
                <th className="px-6 py-3.5 font-semibold">Created</th>
                <th className="px-6 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {items.map((r) => (
                <tr key={r._id} className="hover:bg-slate-950/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-slate-100">{r.fullName}</div>
                    <div className="text-xs text-slate-500 mt-1">{r.phone}</div>
                    <div className="text-xs text-slate-500 mt-1">{r.email}</div>
                    <div className="text-xs text-slate-500 mt-2">{r.college}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500 mb-2">Dept: {r.department} • Year: {r.yearOfStudy}</div>
                    {r.members?.length ? (
                      <div className="space-y-2">
                        {r.members.map((m, idx) => (
                          <div key={`${m.email}-${idx}`} className="rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-2">
                            <div className="text-slate-100 font-semibold text-xs">{m.name}</div>
                            <div className="text-slate-400 text-xs">{m.phone} • {m.email}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">No additional members</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-100">{r.preferredProblem}</div>
                  </td>
                  <td className="px-6 py-4">
                    {fileUrl(r.pptFile) ? (
                      <a
                        href={fileUrl(r.pptFile)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/15 px-3 py-2 text-xs font-semibold text-blue-200 transition-colors"
                        title={r.pptFile?.originalName || 'View PPT'}
                      >
                        View PPT
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {fileUrl(r.paymentScreenshot) ? (
                      <a
                        href={fileUrl(r.paymentScreenshot)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
                        title={r.paymentScreenshot?.originalName || 'View payment proof'}
                      >
                        View Payment
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => void deleteOne(r._id)}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-900/40 hover:bg-slate-800/60 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="p-5 text-sm text-slate-400 border-t border-slate-800">Loading…</div>
        )}
      </div>
    </div>
  );
}

