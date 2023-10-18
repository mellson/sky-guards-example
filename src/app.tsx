import { useStatelyActor } from '@statelyai/sky-react';
import { EventFrom } from 'xstate';
import { skyConfig } from './app.sky';

export default function App() {
  const [state, send] = useStatelyActor(
    {
      url: 'https://sky.stately.ai/PdKNJA',
      sessionId: 'countSession-test',
    },
    skyConfig,
  );

  const currentState = state;
  if (!currentState.nextEvents || send === undefined)
    return <h2>Loading...</h2>;

  const possibleEvents = currentState.nextEvents as unknown as EventFrom<
    typeof skyConfig.machine
  >['type'][];
  const machineName = currentState.machine.config.id;

  return (
    <div className="app">
      <p>
        <span className="sky-header">Stately Sky Example ⛅</span>
      </p>
      This is based on the starter app for Stately Sky ⛅
      <br />
      Check out the{' '}
      <a
        href="https://stately.ai/docs/stately-sky-getting-started"
        target="_blank"
      >
        docs
      </a>{' '}
      for information on how to get started.
      <div>
        <h1>
          <strong>{JSON.stringify(currentState.value)}</strong>
        </h1>
        <h2>
          <strong>Count: {JSON.stringify(currentState.context.count)}</strong>
        </h2>

        <div>
          {possibleEvents.map((event) => (
            <button key={event} onClick={() => send?.({ type: event })}>
              {event}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
