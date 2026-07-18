export default function ShopNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-950 px-6 text-center text-brand-50">
      <h1 className="text-2xl font-semibold">المتجر غير موجود</h1>
      <p className="max-w-md text-brand-400">
        تحقق من رابط المتجر أو تواصل مع الدعم إذا كنت تعتقد أن هذا خطأ.
      </p>
      <a
        href="/"
        className="mt-4 text-sm text-accent-400 underline-offset-4 hover:underline"
      >
        العودة للرئيسية
      </a>
    </div>
  );
}
