<h1 align="center" style="border-bottom: none;">🚀 Natural Language Understanding Sample Application</h1>
<h3 align="center">This Node.js app demonstrates some of the Natural Language Understanding service features.</h3>
<p align="center">
  <a href="http://travis-ci.org/watson-developer-cloud/natural-language-understanding-nodejs">
    <img alt="Travis" src="https://travis-ci.org/watson-developer-cloud/natural-language-understanding-nodejs.svg?branch=master">
  </a>
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>
</p>

Natural Language Understanding is a collection of APIs that offer text analysis through natural language processing. This set of APIs can analyze text to help you understand its concepts, entities, keywords, sentiment, and more. Additionally, you can create a custom model for some APIs to get specific results that are tailored to your domain.

[![Demo](demo.gif)](https://natural-language-understanding-demo.ng.bluemix.net) [![Greenkeeper badge](https://badges.greenkeeper.io/watson-developer-cloud/natural-language-understanding-nodejs.svg)](https://greenkeeper.io/)


## Prerequisites

1. Sign up for an [IBM Cloud account](https://cloud.ibm.com/registration).
1. Download the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview).
1. Create an instance of the Natural Language Understanding service and get your credentials:
    - Go to the [Natural Language Understanding](https://cloud.ibm.com/catalog/services/natural-language-understanding) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Show** to view the service credentials.
    - Copy the `apikey` value, or copy the `username` and `password` values if your service instance doesn't provide an `apikey`.
    - Copy the `url` value.

## Configuring the application

1. In the application folder, copy the *.env.example* file and create a file called *.env*

    ```
    cp .env.example .env
    ```

2. Open the *.env* file and add the service credentials that you obtained in the previous step.

    Example *.env* file that configures the `apikey` and `url` for a Natural Language Understanding service instance hosted in the US East region:

    ```
    NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY=X4rbi8vwZmKpXfowaS3GAsA7vdy17Qh7km5D6EzKLHL2
    NATURAL_LANGUAGE_UNDERSTANDING_URL=https://gateway-wdc.watsonplatform.net/natural-language-understanding/api
    ```

    - If your service instance uses `username` and `password` credentials, add the `NATURAL_LANGUAGE_UNDERSTANDING_USERNAME` and `NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD` variables to the *.env* file.

    Example *.env* file that configures the `username`, `password`, and `url` for a Natural Language Understanding service instance hosted in the Sydney region:

    ```
    NATURAL_LANGUAGE_UNDERSTANDING_USERNAME=522be-7b41-ab44-dec3-g1eab2ha73c6
    NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD=A4Z5BdGENrwu8
    NATURAL_LANGUAGE_UNDERSTANDING_URL=https://gateway-syd.watsonplatform.net/natural-language-understanding/api
    ```

## Running locally

1. Install the dependencies

    ```
    npm install
    ```

1. Run the application

    ```
    npm start
    ```

1. View the application in a browser at `localhost:3000`

## Deploying to IBM Cloud as a Cloud Foundry Application

1. Login to IBM Cloud with the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview)

    ```
    ibmcloud login
    ```

1. Target a Cloud Foundry organization and space.

    ```
    ibmcloud target --cf
    ```

1. Edit the *manifest.yml* file. Change the **name** field to something unique.  
  For example, `- name: my-app-name`.
1. Deploy the application

    ```
    ibmcloud app push
    ```

1. View the application online at the app URL.  
For example: https://my-app-name.mybluemix.net


## Directory structure

```none
.
├── app.js                      // express routes
├── config                      // express configuration
│   ├── express.js
│   └── security.js
├── manifest.yml
├── package.json
├── public                      // static resources
├── server.js                   // entry point
├── test                        // tests
└── views                       // react components
```

## License

This sample code is licensed under Apache 2.0.  
Full license text is available in [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM

Find more open source projects on the
[IBM Github Page](http://ibm.github.io/).
