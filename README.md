# Ad Worker
This is an experiment to try fetching display ads from within a web worker via header bidding. Unfortunately, it is not functional: many bidders require access to the DOM, and workers don't have DOM access.
