# Tasks

## Task 1: Examine the HTTP messages

- Open the `requests.http` file.
- Issue a GET request to the `http://developer.mozilla.org`.
- Examine the request and the response in the upcoming tab.

Answer the following questions:

- What information can you read from the first line of the **request**? 
- What is the method of this **request**?
- How do we call the other lines belongs to the **request**, e.g.: `User-Agent: vscode-restclient`
- What information can be read from the first line of the **response**?
- What does the `Content-Length` and `Content-Type` headers represent in the response?
- How do we separate the headers from the body?
- What does the body contains?
- How do we know on which server should we locate to fulfill the request?
- How does the server know which **resource** it should serve?

### Background materials

- [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [MDN: URL](https://developer.mozilla.org/en-US/docs/Web/URI)
- [MDN: HTTP Session](https://developer.mozilla.org/en-US/docs/Web/HTTP/Session)
- [HTTP.dev: Headers](https://http.dev/headers)

Deep dive:

- [MDN: Headers Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [MDN: HTTP Message](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)


## Task 2: What else can be the resource?

- Issue a new GET request to the `GET https://rickandmortyapi.com/api/character/2` endpoint.

Answer the following questions.

- What is the Status Code of the response?
- What do you see in the body?
- How do we now what is the "format" of the body?
- Can you create a new HTTP request to get the image of the character?

### Background materials

- [HTTP.dev Status codes](https://http.dev/status)

Deep dive:

- [MDN: Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

Fun:

- [Status Codes with Cats](https://http.cat/)
- [Status Codes with Dogs](https://http.dog/)
- [Status Codes with Ducks](https://httpducks.com/)

## Task 3: Creating new things on the server

- Issue the `npm run serve` command. It spins up a server on `http://localhost:4444`.
- You can test it, by initiating a GET request to `http://localhost:4444/pets`. It should return a `200 OK` with an empty array (JSON) in the body.

- Create a new pet, using a POST request on `http://localhost:4444/pets`.
- The body of the POST request looks like this:

```json
{
  "name": "Fido",
  "kind": "dog"
}
```

- `name` is a string, it should not be empty. `kind` can be: "dog", "cat", "insect" or "reptile".

- You can always list your existing pets with `GET http://localhost:4444/pets`. If you restart the server, it always start with an empty array.

Answer the following questions:

- What is the difference between the request body and the response body?
- What is happening, if you miss the content type header?
- What is happening, if you send a malformed JSON?
- What is happening, if you send correctly formed JSON but, its values are invalid (e.g. the kind is "spider" or the name is an empty string)?
- Why it is not needed to send a `Content-Type` header for the GET requests?

### Background materials

- [HTTP.dev: Methods](https://http.dev/methods)

Fun

- [How the internet was invented](https://www.theguardian.com/technology/2016/jul/15/how-the-internet-was-invented-1976-arpa-kahn-cerf)

Deep dive:

- [MDN: Methods Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [Wikipedia: Internet Protocol Stack](https://en.wikipedia.org/wiki/Internet_protocol_suite)
- [RFC 9110: HTTP Semantics ](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9112: HTTP 1.1](https://datatracker.ietf.org/doc/html/rfc9112)