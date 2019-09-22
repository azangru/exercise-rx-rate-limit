const { Subject } = require('rxjs');

const rateLimit = require('./rate-limit');

const subject = new Subject();

const rateLimitedSubject = subject.pipe(
  rateLimit(1, 2000)
);

rateLimitedSubject.subscribe(console.log);

subject.next(1);
subject.next(2);
subject.next(3);
