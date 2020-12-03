/*

  Gets branch status to check if branch is closed or not
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function getBranchStatus(branch_id) {
  let branchOperating = true;
  let branchClosedMessage = "";

  const response = await API.get(`app/branch/${branch_id}`);
  const branch = response.data.data;
  if (branch.status === "open") {
    // Check for working hours
    const currentDate = new Date();
    const opensAt = branch.working_hours[0].opens_at
      .split(":")
      .map((hour) => Number(hour));
    const closesAt = branch.working_hours[0].closes_at
      .split(":")
      .map((hour) => Number(hour));
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    if (
      currentHour < opensAt[0] ||
      currentHour > closesAt[0] ||
      (currentHour === opensAt[0] && currentMinute < opensAt[1]) ||
      (currentHour === closesAt[0] && currentMinute > closesAt[1])
    ) {
      branchOperating = false;
      const {opens_at, closes_at} = branch.working_hours[0];
      branchClosedMessage = `We're currently closed, Blends operates from ${opens_at} to ${closes_at}`;
    }
    // Check for working days
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const holidayDays = days.filter(
      (day) =>
        !branch.working_hours[0].days.find(
          (working_day) => working_day === day,
        ),
    );
    // Check if today is a holiday
    if (holidayDays.includes(days[currentDate.getDay()])) {
      branchOperating = false;
      const {opens_at, closes_at} = branch.working_hours[0];
      branchClosedMessage = `We're currently closed, Blends operates from ${opens_at} to ${closes_at} every day except ${holidayDays.join(
        ",",
      )}`;
    }
  } else if (branch.status === "closed") {
    branchOperating = false;
    branchClosedMessage =
      "We're not receiving orders temporarly, please check back after 10 minutes!";
  } else if (branch.status === "under_maintenance") {
    branchOperating = false;
    branchClosedMessage = "We're currently under maintenance.";
  }

  return [branchOperating, branchClosedMessage];
}
