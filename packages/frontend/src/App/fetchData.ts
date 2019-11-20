import { ajax } from 'rxjs/ajax';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

const getQueryProps = () => {
  const response = {
    url: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'rxjs-custom-header': 'Rxjs'
    },
    body: {
      query: `{
        stringifiedData
      }`
    }
  };

  return response;
};

export const FetchData = () =>
  ajax(getQueryProps()).pipe(
    map(response => {
      if (response.status === 200) {
        return JSON.parse(response.response.data.stringifiedData);
      }
      return of({ error: true, message: `Error ${response.status}` });
    }),
    catchError((error: Error) => {
      return of({ error: true, message: error.message });
    }),
    tap(json => {
      if (json.error) {
        console.error(json);
        return;
      }
      console.log(json);
    })
  );
