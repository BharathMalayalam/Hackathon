const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
                <p className="mb-4">© {new Date().getFullYear()} Hackathon Platform. Powering innovation.</p>
                <p className="text-sm text-slate-500">Dream it. Code it. Deploy it.</p>
            </div>
        </footer>
    );
};

export default Footer;
