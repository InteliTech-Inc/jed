import { DataTable } from "./components/data_table";
import { columns } from "./components/columns";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import { getVotingDataResponse } from "@/lib/server_endpoints";

export default async function VotingsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getVotingDataResponse(id);

  return (
    <section className="p-4">
      <section className=" mb-4 max-w-screen-sm">
        <p className=" text-4xl text-neutral-700 mb-2 font-semibold">Voting</p>
        <p className=" text-neutral-600">
          Track the progress of the voting period. You can filter the data and
          also, download the nominations results.
        </p>
      </section>

      <Suspense
        fallback={
          <div className=" w-full grid place-content-center">
            <Spinner />
          </div>
        }
      >
        <DataTable data={data} columns={columns} />
      </Suspense>
    </section>
  );
}
