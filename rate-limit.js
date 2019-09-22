// from https://github.com/gsipos/rxjs-ratelimit

const { BehaviorSubject, timer } = require('rxjs');
const {
  map,
  mergeMap,
  take,
  filter,
  tap
} = require('rxjs/operators');


const rateLimit = (count, period) => {
  let tokens = count;
  const tokenChanged = new BehaviorSubject(tokens);
  const consumeToken = () => tokenChanged.next(--tokens);
  const renewToken = () => tokenChanged.next(++tokens);
  const availableTokens = tokenChanged.pipe(
    filter(() => tokens > 0)
  );

  return (source) => source.pipe(
    tap((val) => console.log('dafaqs', val)),
    mergeMap((value) => availableTokens.pipe(
        take(1),
        map(() => {
          console.log('hello?')
          consumeToken();
          timer(period).subscribe(renewToken);
          return value;
        })
    ))
  );
}

module.exports = rateLimit;
