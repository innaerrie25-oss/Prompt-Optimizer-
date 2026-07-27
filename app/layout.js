import './globals.css';

export const metadata = {
  title: 'Cosmic Prompt Optimizer | Quantum AI Engine',
  description: 'Transform raw prompts into stellar AI instructions across dimensions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030014] text-slate-100 antialiased selection:bg-purple-500 selection:text-white min-h-screen overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
