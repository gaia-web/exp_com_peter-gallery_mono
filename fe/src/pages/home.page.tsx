import { useComputed, useSignal } from "@preact/signals";
import { Map } from "../utils/fe-utils";

export function HomePage() {
  const count = useSignal(0);
  const double = useComputed(() => count.value * 2);

  return (
    <>
      <Map id="map" className="mt-6 h-[600px] w-full"></Map>
      <div>
        <p>
          (Local signals) {count} x 2 = {double}
        </p>
        <button onClick={() => count.value++}>Count + 1</button>
      </div>
    </>
  );
}
