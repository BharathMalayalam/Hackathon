import { FileCode2 } from 'lucide-react';

interface ProblemCardProps {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

const ProblemCard = ({ id, title, description, tags }: ProblemCardProps) => {
    return (
        <div className="flex flex-col h-full bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl hover:bg-slate-800/80 hover:border-slate-600 transition-all group">
            <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 font-mono text-sm font-semibold rounded-lg border border-blue-500/20">
                    {id}
                </span>
                <FileCode2 className="text-slate-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-400 leading-relaxed mb-6 flex-grow">{description}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-900 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProblemCard;
