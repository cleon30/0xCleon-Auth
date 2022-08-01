# 0xCleon-Auth 

## Introduction

This is a web3 app designed to enable users to Log In using their wallet and their Discord Account. First of all, the user will have to connect their wallet, then he will have to sign a transaction to prove ownership of the wallet and finally he will log in using Discord Auth 3rd Party. All the data gathered will be sent to the backend server where we will store it and manipulate it.

## Data Obtained
1. [x] User in Discord
2. [x] Wallet Address
3. [X] SOL Balance
4. [X] Email
5. [X] Discord Picture
6. [X] Log In time
7. [X] Discord ID
8. [X] Discord Avatar
9. [X] Signature Ownership

## Video Demo

## Design 

<img width="872" alt="image" src="https://user-images.githubusercontent.com/62452212/181995028-680cdada-4151-49e0-b251-207ecde251d7.png">
<img width="682" alt="Captura de Pantalla 2022-08-01 a las 5 24 22" src="https://user-images.githubusercontent.com/62452212/182075174-403a5d9d-9778-434c-891b-25f4cdc5a40b.png">
<img width="881" alt="Captura de Pantalla 2022-08-01 a las 5 23 38" src="https://user-images.githubusercontent.com/62452212/182075193-68606de8-21df-4439-931b-bee6ebdfa41f.png">

## Getting Started

First of all, please change the REACT_APP_CLIENT_ID and REACT_APP_CLIENT_SECRET that are inside .env file, for your own Discord keys. More info: https://discord.com/developers/docs/topics/oauth2

Also, set your Redirect route of discord to : http://localhost:3000/api/discordCallback

### Installation

```bash
git clone https://github.com/cleon30/0xCleon-Auth.git
cd 0xCleon-Auth
npm i
```

### Running
```bash
npm run build && npm run start
```

## Process of Building the Web3 App

At first, I started working only in the App.jsx and App.css , creating the basic logic of the web3 App: Searching for wallet, connecting wallet functions and button + logic, basic html + css... Also I started creating better designs doing reverse engineering to the html and css of drift.trade webpage(most of the designs are from there). 

Then, I created the Sign button interface, where the user had to sign a specific message, making it as a proof of ownership, making sure that who is signing is actually the person that is able to sign with the wallet.  

After that, I started investigating how Discord Auth actually works on ReactJS and I searched A LOT of githubs and tutorials(probably this was the top difficult part of the project). Doing that i figure it out that I would have to create more directories and folders. Because of that, I started to expand the project with more folders.

For that, I created a /login , /dashboard , /api/discordCallback,. Basically playing with routes so the project could get new steps. 

Also I have to mention the important details of auth in Discord: Basically you start with a CLIENT_ID , SECRET_ID and ROUTE . Client is a public key and will point to your Discord account while secret id is like "the password" of your account, is the private key used to validate the discord auth process. About the route URL is the url that will be used as reference to the auth process of discord, you have to make sure that is valid with your project. In my case I made a redirect to : http://localhost:3000/api/discordCallback

In that process also I gathered a lot of information from discord accounts, and I basically obtained and transmited this info usign react-redox and axios libraries, interacting with the Discord Account token, and obtaining all the info mentioned above. 

Finally, I ended working on the Dashboard page, getting all the process and data together and making sure everything is OK. In this Dashboard Page there are a lot of things : SOL Balance of the account , Picture of the Discord Account, Log out(must Click on Discord Picture), Address , email,..

All this information is gathered as a JSON file and could be sent to any Database server side, in my case I tested with listeners in another route and It worked.

<img width="800" alt="Captura de Pantalla 2022-08-01 a las 5 24 57" src="https://user-images.githubusercontent.com/62452212/182079668-ef8260fc-5b43-41ff-9011-acc5a61f9f60.png">


Probably I have forgot some things but I think is a good summary to understand how does it work. 

## Conclusion

I enjoyed working on this project and I personally think that has been really useful to do. I have to mention that I usually focus more on backend or smart contracts, and playing with frontend has been enjoyable.
