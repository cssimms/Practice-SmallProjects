/**
 Technical question with Valon, in October 2024. Didn't manage to copy out my solution, 
 but I didn't get to working solution in time and was declines the next step in the interview process.

Schedule Meetings
Given a set of meetings and their durations, output a formatted schedule that evenly distributes the meetings throughout the workday. 
If some meetings are longer than others, place those meetings at the beginning of the day to get them over with.
Workday is considered 9am - 6pm. 
All durations will be in hours, and a minimum break between meetings would be 1 hour.

input = [
    ["Monday", 1],
    ["Monday", 2],
    ["Tuesday", 1],
    ["Tuesday", 3],
    ["Tuesday", 1],
    ["Wednesday", 5]
]

output = 
Monday: (meeting from 9am - 11am), (break from 11am - 5pm), (meeting from 5pm to 6pm).
Tuesday: (meeting from 9am - 12pm), (break from 12pm to 2pm), (meeting from 2pm to 3pm), (break from 3pm to 5pm), (meeting from 5pm to 6pm).
Wednesday: (meeting from 9am - 2pm), (break from 2pm - 6pm).
*/


const scheduleMeetings = (meetings) => {

    /**
     * { 
     *   "Monday": [2, 1]
     *   "Tuesday": [3, 1, 1]
     *   ...
     * }
     */
    const schedule = new Map()

    meetings.forEach(([day, length]) => {
        if (schedule.has(day)) {
            schedule.get(day).push(length)
        } else {
            schedule.set(day, [length])
        }
    })

    console.log(schedule)

}

// TESTS //
const testInput = [
    ["Monday", 1],
    ["Monday", 2],
    ["Tuesday", 1],
    ["Tuesday", 3],
    ["Tuesday", 1],
    ["Wednesday", 5]
]
scheduleMeetings(testInput)
