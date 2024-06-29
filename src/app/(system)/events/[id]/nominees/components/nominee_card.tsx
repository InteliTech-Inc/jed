"use client";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface Nominee {
  id: string;
  full_name: string;
  img_url: string;
  categories: {
    category_name: string;
  };
  code: string;
}

interface Vote {
  nominee_id: string;
  count: string;
}

type Props = {
  nominee: Nominee;
  votes: Vote[];
};

export default function NomineeCard({ nominee, votes }: Props) {
  const router = useRouter();

  // Realtime for nominees fetch
  useEffect(() => {
    const nominee_channel = db
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nominees",
        },
        () => {
          router.refresh();
          console.log("Nominee channel updated");
        }
      )
      .subscribe();

    return () => {
      db.removeChannel(nominee_channel);
    };
  }, [db, router, nominee]);

  const handleDelete = async () => {
    toast.warning(`Are you sure you want to delete this nominee?`, {
      action: {
        label: "Yes",
        onClick: async () => {
          toast.promise(
            async () => {
              const { error } = await db
                .from("nominees")
                .delete()
                .eq("id", nominee.id)
                .single();

              if (!error) {
                toast.success("Nominee deleted successfully");
                router.refresh();
                return;
              }
              toast.error("Couldn not delete the nominee!");
            },
            {
              loading: <Spinner />,
            }
          );
        },
      },
    });
  };

  return (
    <div className=" w-full lg:max-w-[20rem]">
      <div className="relative h-[20rem] w-full flex-grow rounded-lg overflow-hidden hover:shadow transition-all duration-150 bg-white group">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee.img_url}`}
          className="z-0 h-full object-cover w-full transition-all scale-110 duration-300 group-hover:scale-100"
          width={2000}
          height={2000}
          alt={nominee.full_name}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-100 h-3/4 z-10"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white z-20">
          <h2 className="text-xl font-bold">{nominee.full_name}</h2>
          <p>{nominee.categories.category_name}</p>
          <p>Nominee's code: {nominee.code}</p>
        </div>

        <Link
          href={`nominees/edit/${nominee.id}`}
          className="absolute top-0 right-0 bg-white/90 backdrop-blur-md m-4 font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 z-30"
        >
          Edit
        </Link>
        <Button
          onClick={handleDelete}
          variant={"ghost"}
          className="absolute top-0 right-18 bg-white/90 backdrop-blur-md m-4 font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 z-30"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
