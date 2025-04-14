import Logo from "@/assets/logo/Logo";


export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <Logo className="w-28 h-20 -mb-4" color='var(--foreground)' />
      <h1 className=" text-3xl font-extrabold">Mobarrez</h1>
    </div>
  );
}