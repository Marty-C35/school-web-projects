# Iteration 11: State managment

In this iteration implement a simple web music player.
You have to use Recoil for state management.

## Basic requirements
1. Fetch the songs from [the endpoint](https://www.fi.muni.cz/~xorsula1/resources/songs.php)
   1. This will be your library
   2. You can hardcode the json in your solution without fetching. 1pt will be deducted from your solution
2. Queue -- songs to be played
   1. Add ability to add and remove songs from queue
3. Show current playing song and the song that will be next
   1. Display "None" if no next song is queued
4. Add ability to skip to next song
5. Add stats
   1. You can skip the stats, 1pt will be deducted from your solution

## You need to

1. Install recoil
2. Define atoms
   1. You will need at least atom for songs, filters and current song
3. Define selectors
   1. Some songs are in queue some in library (and that can be changed by the checkbox)
4. Hook up everything to the interface

# Tips

1. Check out lecture slides and demo-solution. Everything should be already solved there.
2. The weird elements names like `<Row>` and `<Col>` are from [react-bootstrap](https://react-bootstrap.netlify.app/components/alerts)
    + You do not need to worry about it, and I would not recommend learning it or even using it
    + Checkout [tailwind](https://tailwindcss.com/) for modern alternative
3. Make sure your code is `npm run test` safe. It's using [xo](https://github.com/xojs/xo)
