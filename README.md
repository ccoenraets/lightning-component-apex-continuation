# Calling an Apex Continuation from a Lightning Component 

Read [this blog post](https://developer.salesforce.com/blogs/developer-relations/) to learn more about the examples in this repository.

## Installation Instructions

1. Authenticate with your hub org (if not already done):
    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone the repository:
    ```
    git clone https://github.com/ccoenraets/lightning-component-apex-continuation
    cd lightning-component-apex-continuation
    ```

1. Create a scratch org and provide it with an alias (continuations):
    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a continuations
    ```

1. Push the app to your scratch org:
    ```
    sfdx force:source:push
    ```

1. Assign the ```continuation``` permission set to the default user:
    ```
    sfdx force:user:permset:assign -n continuation
    ```

1. Open the scratch org:
    ```
    sfdx force:org:open
    ```

1. Open the Continuation sample app in the App Launcher