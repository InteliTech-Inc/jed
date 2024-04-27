import React from "react";
import CreateEventForm from "./components/create_event";
import BackButton from "@/components/ui/back-button";

function CreateEventsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <BackButton />
      <div>
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Create Event
        </h3>
      </div>
      <div>
        <CreateEventForm />
      </div>
    </div>
  );
}

export default CreateEventsPage;
