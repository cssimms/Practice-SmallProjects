// General problems around "longest substring", window problems are tripping me up for some reason. 
/**
 * @param {string} s
 * @return {number}
 */
export var lengthOfLongestSubstring = function (s) {
    let seen = new Map()
    let left = 0, longest = 0, currentLength = 0;

    for (let right = 0; right < s.length; right++) {
        // Have we seen this right element before?
        if (seen.has(s[right])) {
            // move left index to just after the last time we've seen it
            // sometimes the last seen index is before our current left, and we don't want 
            // to go backwards
            left = Math.max(seen.get(s[right]) + 1, left)
        }

        // Update length
        currentLength = right - left + 1
        longest = Math.max(longest, currentLength)

        // record last seen index for this character
        seen.set(s[right], right)
    }

    return longest;
};

// export const lengthOfLongestSubstring = function (s) {
//     let charToNextIndex = new Map();
//     let maxLen = 0;
//     let left = 0;
//     for (let right = 0; right < s.length; right++) {
//         if (charToNextIndex.has(s[right])) {
//             left = Math.max(charToNextIndex.get(s[right]), left);
//         }
//         maxLen = Math.max(maxLen, right - left + 1);
//         charToNextIndex.set(s[right], right + 1);
//     }
//     return maxLen;
// };



