# Connect4

INSTRUCTIONS FOR RUNNING CONNECT4

1. Unzip folder containing client directory, server directory, and package.json
2. Navigate to directory Connect4 in terminal.
  - cd [path_to_Connect4]
2. When in root directory (Connect4), run commands in order:
  - npm install
  - npm run setup
  - npm run build 
  - **Note:** bundle.js is now built and webpack is watching for any changes
3. In root directory with another terminal, run command:
  - npm run start:server
  - **Note:** two terminals should be open. One running the webpack build, and another serving the static files on port 3000.
4. Open google chrome browser
  - Enter localhost:3000 in browser address bar
5. Select desired colors for Player 1 and Player 2
  - Click Save colors button
6. Play Connect4! 
