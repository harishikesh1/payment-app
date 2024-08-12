- Clone the repo

```jsx
git clone git@github.com:harishikesh1/payment-app.git
```

- npm install
 

```jsx
docker run -d --name paytm-container -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v paytm-db:/var/lib/postgresql/data postgres
```

- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma generate
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)


<!-- 
docker rm paytm-container

 
 -->
