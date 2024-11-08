/**
practice ATTEMPT 11/4/24, 1 hour, got most of the way through, missing an edge case test and printing into a readable format
 * 
 Technical question with Valon, in October 2024. Didn't copy out my solution, 
 but I didn't get to working solution in time and was declines the next step in the interview process.

Schedule Meetings
Given a set of meetings and their durations, output a formatted schedule that evenly distributes the meetings throughout the workday. 
If some meetings are longer than others, place those meetings at the beginning of the day to get them over with.
Workday is considered 7am - 6pm.  ( 7 - 18 )
All durations will be in hours, and a minimum break between meetings would be 1 hour.

input = [
    ["Monday", 1],
    ["Monday", 2],
    ["Tuesday", 1],
    ["Tuesday", 2],
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

    /**
     * {
     * Monday: [
     * {
     *   meeting: true | false,
     *   start: string,
     *   end: string
     * }, ...
     * ],
     * Tuesday: [
     * {}
     * ]
     */
    const printableSchedule = new Map()
    schedule.forEach((lengths, day, map) => {
        // Ensure we're dealing with an array value
        if (!printableSchedule.has(day)) {
            printableSchedule.set(day, [])
        }

        // Math to get some data about our day
        const totalMeetingTime = lengths.reduce((acc, length) => acc + length, 0)
        const totalBreakTime = 11 - totalMeetingTime // 11 hours in a day
        const numberOfBreaks = lengths.length - 1 // TODO catch edge case where there is only one meeting in a day
        const averageBreakTime = Math.floor(totalBreakTime / (numberOfBreaks === 0 ? 1 : numberOfBreaks))
        let leftoverBreakTime = totalBreakTime % numberOfBreaks // need to distribute extra breaktime into each break
        const individualBreakSurplus = Math.ceil(leftoverBreakTime / numberOfBreaks) // chunk of time to distribute into each break, use of ciel here will "front load" extra break time 

        console.log(`Schedule data for day ${day}`, { totalMeetingTime, totalBreakTime, numberOfBreaks, averageBreakTime, leftoverBreakTime, individualBreakSurplus })
        // Sort meetings so we are dealing with the longest one first
        const sortedLengths = lengths.sort((a, b) => b - a)
        let currentTime = 7
        sortedLengths.forEach((meetingLength) => {
            const meetingObject = {
                meeting: true,
                start: currentTime,
                end: currentTime + meetingLength
            }
            currentTime += meetingLength
            printableSchedule.get(day).push(meetingObject)

            // Only add a break if we haven't hit the end of the day yet AND we have breaks left to add
            if (currentTime < 18) {
                // When there is leftover break time, we should distribute into our breaks as we go
                const breakTimeOverflow = leftoverBreakTime > 0 ? individualBreakSurplus : 0
                leftoverBreakTime--

                const thisBreakLength = averageBreakTime + breakTimeOverflow
                const breakObject = {
                    meeting: false,
                    start: currentTime,
                    end: currentTime + thisBreakLength
                }
                currentTime += thisBreakLength
                printableSchedule.get(day).push(breakObject)
            }
        })


    })
    console.log(printableSchedule)

}

// TESTS //
const testInput = [
    ["Monday", 1],
    ["Monday", 2],
    ["Tuesday", 1],
    ["Tuesday", 2],
    ["Tuesday", 1],
    ["Wednesday", 5],
    ["Thursday", 1],
    ["Thursday", 1],
    ["Thursday", 1],
    ["Thursday", 1],
    ["Thursday", 1],
]
scheduleMeetings(testInput)
