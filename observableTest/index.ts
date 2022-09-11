import { Observable, of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError } from "rxjs/operators";

const data$: Observable<any> = fromFetch(
  "https://api.github.com/users?per_page=5"
).pipe(
  switchMap((response) => {
    if (response.ok) return response.json();
    else return of({ error: true, message: `Error ${response.status}` });
  }),
  catchError((err) => {
    console.error(err);

    return of({ error: true, message: err.message });
  })
);

data$.subscribe((result): void => {
  const users = result.map((user: any) => user.login);
  console.log(users);
});
