import '@/app/globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        #site-header, #site-footer { display: none !important; }
        main { min-height: auto !important; }
      `}</style>
      {children}
    </>
  );
}
