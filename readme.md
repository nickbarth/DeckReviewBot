## Deck Review Bot

Update .env and run. Requires mod to not be timed out.

OAuth Access tokens can be created here https://twitchapps.com/tmi/

### Admin Commands

<table>
<tr>
  <td>Command</td>
  <td>Info</td>
  <td>Example</td>
</tr><tr>
  <td>!deckreview start</td>
  <td>Displays start message and clears decklists.</td>
  <td>decklistbot: Decklist reviews started.</td>
</tr><tr>
  <td>!deckreview pick</td>
  <td>Chooses a random decklist, displays it, then deletes it from the list.</td>
  <td>decklistbot: nick's decklist has been chosen! ''https://example.com/ heres my deck''</td>
</tr><tr>
  <td>!deckreview count</td>
  <td>Shows a count of how many decklists have been submitted.</td>
  <td>decklistbot: There are 0 decklists submitted.</td>
</tr><tr>
  <td>!deckreview debug</td>
  <td>Debug info with all decklists and users.</td>
  <td>decklistbot: [{"username":"nick","message":"test"}]</td>
</tr>
</table>


### Viewer Commands

<table>
<tr>
  <td>Command</td>
  <td>Info</td>
  <td>Example</td>
</tr><tr>
  <td>!deckreview help (or just !decklist)</td>
  <td>Displays deckreviewbot help message.</td>
  <td>deckreviewbot: Submit decklists by using command "!deckreview http://example.com/url-to-your-decklist''</td>
</tr><tr>
  <td>!deckreview [URL]</td>
  <td>Adds a viewer's decklist to the queue if it has a URL to their list.</td>
  <td>deckreviewbot: Thanks nick! Your decklist has been submitted.</td>
</tr>
</table>

This is free and unencumbered software released into the public domain.


<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Public_Domain_Mark_button.svg/1200px-Public_Domain_Mark_button.svg.png" height=50>
