import { Suspense } from "react";
import { CategoryRow } from "../components/CategoryRow";

export default function Home() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<div>Loading…</div>}>
        <CategoryRow title="Popular" category="Popular" />
        <CategoryRow title="New" category="New" />
        <CategoryRow title="Comedy" category="Comedy" />
        <CategoryRow title="Action" category="Action" />
      </Suspense>
    </div>
  );
}
