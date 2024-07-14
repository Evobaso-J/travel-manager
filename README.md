# Travel Manager

A travel management application built with Nuxt 3 and Tailwind CSS.

As per the [requirements](./REQUIREMENTS.md), the application is divided into two main sections: Travels and Bookings.
Each section is provided with a dedicated page and a form to add, edit, and delete the respective data.
The app also features a dashboard to show mocked data for the fictitious Travlog company results and current state.

Dont't forget to try it on your mobile device!

Currently deployed on Netlify and available [HERE](https://travlog-bsl.netlify.app/)

## Structure

**Where are the data stored?**

While the API calls are actually directed to [an almost real server](https://my-json-server.typicode.com/), the stored data is mocked through the [db.json](./db.json) file. Once that file is modified and pushed to the repository, the changes will be reflected in the application.

**Server and API layer**

The application leverages the [Nuxt server routes](https://nuxt.com/docs/guide/directory-structure/server) to create a simple server. 

For each existing entity we define a Resource Client, which contains all the necessary information to interact with the server and the business logic of each resource.
Each Resource Client contains:
- The resource API route
- Its models (request, response and internal)
- Parser and write functions to transform request data to the server format and response data to the internal format

Parser and writers can be called automatically whenever you fetch or send data to the server by using the [useResourceClientFetch](src/resources/useResourceClientFetch.ts) composable.

**Frontend**

The frontend is built with Nuxt 3 and Tailwind CSS with the classic Nuxt folder structure. For a cleaner folder structure, the root of the application is rooted in the `src` folder.

A small component library has been implemented to speed up the development process. 
It includes both generic components crafted with HTML and Tailwind CSS, resource-specific components, and a couple of composables.

Some core components:
- [DataTable](src/components/table/DataTable.vue)
- [BaseForm](src/components/form/BaseForm.vue) with its [useForm](src/composables/useForm.ts) composable
- [BaseInput](src/components/inputs/BaseInput.vue)

And a couple of spicy composables:
- [useConfirmationModal](src/composables/useConfirmationModal.ts)
- [useNotification](src/composables/useNotification.ts)

## Setup

Make sure to install the dependencies through pnpm. 
Use corepack to enable the right version of pnpm.

More information about corepack can be found [in this article](https://www.totaltypescript.com/how-to-use-corepack)

Then run the following:
```bash
pnpm i
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

If you want to see the production build locally, you can do so by following the steps below.

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```
