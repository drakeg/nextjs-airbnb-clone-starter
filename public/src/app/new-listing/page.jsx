export default function NewListingPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm font-semibold text-sky-700">Hosting</p>
      <h1 className="text-4xl font-bold tracking-tight">Create a listing</h1>
      <p className="mt-2 text-slate-500">
        The form is ready for the Prisma-backed create action in the next data-layer step.
      </p>

      <div className="mt-8 space-y-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        {[
          ["Title", "A memorable name for your stay"],
          ["Location", "City, region, or destination"],
          ["Stay type", "Cabin, house, camper, tiny home…"],
          ["Nightly price", "189"],
        ].map(([label, placeholder]) => (
          <label key={label} className="block">
            <span className="mb-2 block text-sm font-semibold">{label}</span>
            <input
              placeholder={placeholder}
              disabled
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-500"
            />
          </label>
        ))}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Description</span>
          <textarea
            placeholder="What makes this place special?"
            disabled
            rows={5}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-500"
          />
        </label>
        <button
          disabled
          className="w-full rounded-xl bg-slate-300 px-5 py-3 font-semibold text-slate-600"
        >
          Save listing — database connection coming next
        </button>
      </div>
    </section>
  );
}
