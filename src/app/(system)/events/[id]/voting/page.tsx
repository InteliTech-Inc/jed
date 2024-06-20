import { DataTable } from "./components/data_table";
import { columns } from "./components/columns";
import { VotingDataResponse } from "@/types/types";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
const data: VotingDataResponse[] = [
  {
    id: "heljejle",
    full_name: "Nana Kwasi Asante",
    category: "Software Engineer",
    code: "AD242",
    email: "nkasante@gmail.com",
    phone: "07034567890",
    number_of_votes: 30,
  },
  {
    id: "heljejledfwrv",
    full_name: "Evans Elabo",
    category: "Software Engineer",
    code: "CW242",
    email: "evanselabo@gmail.com",
    phone: "0703322290",
    number_of_votes: 25,
  },
  {
    id: "heljej1224le",
    full_name: "Diabene Yaw Addo",
    category: "Trachtech lead",
    code: "ZY242",
    email: "addodiabene69@gmail.com",
    phone: "0559959049",
    number_of_votes: 5,
  },
  {
    id: "heljejle",
    full_name: "Joshua Owusu Richardson",
    category: "Trachtech lead",
    code: "BDE32",
    email: "jrowusu@gmail.com",
    phone: "07034567890",
    number_of_votes: 50,
  },
  {
    id: "heljebszejle",
    full_name: "Joshua Owusu Richardson",
    category: "Software Engineer",
    code: "C3E32",
    email: "jrowusu@gmail.com",
    phone: "07034567890",
    number_of_votes: 584,
  },
  {
    id: "heljejler3dgbre",
    full_name: "Kweku Boateng Diabene",
    category: "Rapper of the Year",
    code: "XX242",
    email: "kboat@gmail.com",
    phone: "030493822944",
    number_of_votes: 32,
  },
];

export default async function VotingsPage() {
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
