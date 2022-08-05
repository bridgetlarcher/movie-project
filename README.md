# Movie Search

A short movie searching project that I worked on for TinyHood's interview process.

## Tech Stack

Next.js, React, Typescript, and TailwindCSS

## API

| Method   | Path        | Parameters                           | Example                                      |
|----------|-------------|--------------------------------------|----------------------------------------------|
| GET      | /search     | title (string)                       | /search?title=star%20wars                    |
| POST     | /favorites  | omdb_id (string), favorite (boolean) | /favorites?omdb_id=tt0038650&favorite=false  |
---