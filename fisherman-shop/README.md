# Noah's Store

Thanks for the opportunity to make some fun stuff and hopefully meet y'all. 

Setup:

`yarn/npm install`

`yarn/npm build`

`node server`

go to localhost:8080 and you're there!

## Fun Facts

I'm pretty new to React, so if there's anything wildly un-Reactly about the way this is built, I apologize in advance. 

I tried to keep potential future changes in mind with the architecture. Right now the cart is shared by all users, but could
easily be modified for single users by a quick change in API calls. 

The same cart component is used in both the side cart 
and detail cart view, with potential for easy expansion to any other views (mobile-only, nav bar, etc).

I also included a very basic REST influenced wrapper around the Fetch API to provide for dead simple api calls that could 
easily be broadened to include query parameters and other features. 

## Things to Improve

If I had more time to work on this, there's a number of things I would have done differently. 

Coming from Angular I've found managing state in React to be a bit of a challenge (mainly without Redux, which does wonders). 
While in Angular it was easy enough to store relevant data in a service and inject it, the process of lifting state upwards 
in React feels a bit tedious, and having a cart + functionality across mutliple views is a pretty convenient case for something 
like Redux. 

I focused more on technical aspects so this site is unabashedly not very pretty, and not as responsive as it could be.

This was my first time trying out create-react-app (previously I've done all my webpack configs by hand/ctrl+c) and it feels
like it bloats things a little. But hot-reloading out of the box is pretty slick! 

Thanks again, hope to hear from you soon!





