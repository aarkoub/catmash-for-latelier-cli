import {Response, Server} from "miragejs"

if (process.env.NODE_ENV === "test") {

    const server = new Server({
        urlPrefix: process.env.REACT_APP_API_HOST_TEST,
        namespace: "",
        routes() {
            this.get("user", (schema) => {
                return new Response(200);
            });

            this.get("cats", (schema) => {
                 return new Response(200, {"Content-Type":  "application/json"},
                         [{ id: 1, pictureUrl: "fake_url1", nbVotes:5 },
                          { id: 2, pictureUrl: "fake_url2", nbVotes:6 },
                          { id: 3, pictureUrl: "fake_url3", nbVotes:8 },
                          { id: 4, pictureUrl: "fake_url4", nbVotes:52 }
                        ]

                 )});

            this.get("cats/match", (schema) => {
                 return new Response(200, {"Content-Type":  "application/json"},
                        {user: {id: 5},
                         cat1: { id: 1, pictureUrl: "fake_url1", nbVotes:5 },
                         cat2: { id: 2, pictureUrl: "fake_url2", nbVotes:6 },
                         catVoted: {id: 1, pictureUrl:  "fake_url1", nbVotes: 5}}

                 )});
            this.get("cats/match/vote", (schema, request) => {
                 return new Response(200, {"Content-Type":  "application/json"},
                        {user: {id: 5},
                         cat1: { id: 1, pictureUrl: "fake_url1", nbVotes:4 },
                         cat2: { id: 2, pictureUrl: "fake_url2", nbVotes:7 },
                         catVoted: {id: 3, pictureUrl:  "fake_url2", nbVotes: 7}}

                 )});

             }
    });
  server.passthrough();
}