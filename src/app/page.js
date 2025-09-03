import Landing from "@/components/templates/Landing";


export default function Home() {
  return (
    <Landing />
  );
}


// the below part seems useless and not related to this component but i didn't want to delete it yet
// {{
//   `Scheduling request: "${$node["Process Chat Message"].json.originalMessage}". Details: title=${$node["Process Chat Message"].json.scheduleData.title}, time=${$node["Process Chat Message"].json.scheduleData.timeExtracted || 'not specified'}, date=${$node["Process Chat Message"].json.scheduleData.dateExtracted || 'not specified'}. Confirm these details and ask for any additional information needed to schedule.`
// }}
