import React from 'react';
import scrollToElement from 'scroll-to-element';
import Input from './Input.jsx';
import Output from './Output/Output.jsx';
import { analyzeWithAllFeatures } from './utils/request';

// eslint-disable-next-line
const DEFAULT_TEXT = 'In the rugged Colorado Desert of California, there lies buried a treasure ship sailed there hundreds of years ago by either Viking or Spanish explorers. Some say this is legend; others insist it is fact. A few have even claimed to have seen the ship, its wooden remains poking through the sand like the skeleton of a prehistoric beast. Among those who say they’ve come close to the ship is small-town librarian Myrtle Botts. In 1933, she was hiking with her husband in the Anza-Borrego Desert, not far from the border with Mexico. It was early March, so the desert would have been in bloom, its washed-out yellows and grays beaten back by the riotous invasion of wildflowers. Those wildflowers were what brought the Bottses to the desert, and they ended up near a tiny settlement called Agua Caliente. Surrounding place names reflected the strangeness and severity of the land: Moonlight Canyon, Hellhole Canyon, Indian Gorge. Try Newsweek for only $1.25 per week To enter the desert is to succumb to the unknowable. One morning, a prospector appeared in the couple’s camp with news far more astonishing than a new species of desert flora: He’d found a ship lodged in the rocky face of Canebrake Canyon. The vessel was made of wood, and there was a serpentine figure carved into its prow. There were also impressions on its flanks where shields had been attached—all the hallmarks of a Viking craft. Recounting the episode later, Botts said she and her husband saw the ship but couldn’t reach it, so they vowed to return the following day, better prepared for a rugged hike. That was not to be, because, several hours later, there was a 6.4 magnitude earthquake in the waters off Huntington Beach, in Southern California. Botts claimed it dislodged rocks that buried her Viking ship, which she never saw again.There are reasons to doubt her story, yet it is only one of many about sightings of the desert ship. By the time Myrtle and her husband had set out to explore, amid the blooming poppies and evening primrose, the story of the lost desert ship was already about 60 years old. By the time I heard it, while working on a story about desert conservation, it had been nearly a century and a half since explorer Albert S. Evans had published the first account. Traveling to San Bernardino, Evans came into a valley that was “the grim and silent ghost of a dead sea,” presumably Lake Cahuilla. “The moon threw a track of shimmering light,” he wrote, directly upon “the wreck of a gallant ship, which may have gone down there centuries ago.” The route Evans took came nowhere near Canebrake Canyon, and the ship Evans claimed to see was Spanish, not Norse. Others have also seen this vessel, but much farther south, in Baja California, Mexico. Like all great legends, the desert ship is immune to its contradictions: It is fake news for the romantic soul, offering passage into some ancient American dreamtime when blood and gold were the main currencies of civic life.The legend does seem, prima facie, bonkers: a craft loaded with untold riches, sailed by early-European explorers into a vast lake that once stretched over much of inland Southern California, then run aground, abandoned by its crew and covered over by centuries of sand and rock and creosote bush as that lake dried out…and now it lies a few feet below the surface, in sight of the chicken-wire fence at the back of the Desert Dunes motel, $58 a night and HBO in most rooms.Totally insane, right? Let us slink back to our cubicles and never speak of the desert ship again. Let us only believe that which is shared with us on Facebook. Let us banish forever all traces of wonder from our lives. Yet there are believers who insist that, using recent advances in archaeology, the ship can be found. They point, for example, to a wooden sloop from the 1770s unearthed during excavations at the World Trade Center site in lower Manhattan, or the more than 40 ships, dating back perhaps 800 years, discovered in the Black Sea earlier this year.';
const DEFAULT_URL = 'http://www.forbes.com/sites/alexkonrad/2016/01/29/new-ibm-watson-chief-david-kenny-talks-his-plans-for-ai-as-a-service-and-the-weather-company-sale/';
export default React.createClass({
  displayName: 'Demo',

  getInitialState() {
    return {
      requestType: 'text',
      loading: false,
      error: null,
      data: null,
      disableButton: false,
      query: {},
    };
  },

  enableButton(event) {
    const disabled = event ? event.target.value.length < 1 : false;
    this.setState({ disableButton: disabled });
  },

  onSubmitClick(value) {
    const query = this.state.requestType === 'url' ? { url: value } : { text: value };
    this.setState({
      query,
      disableButton: true,
      loading: true,
    });
    setTimeout(() => { scrollToElement('#anchor', { duration: 300 }, 100); }, 0);

    // Send the request to NLU
    analyzeWithAllFeatures(query)
      .then(data => this.setState({ data, loading: false, error: null }))
      .catch(error => this.setState({ error, loading: false }))
      .then(() => setTimeout(() => { scrollToElement('#anchor', { duration: 300 }, 100); }, 0));
  },

  changeRequestType(index) {
    const requestType = index === 0 ? 'text' : 'url';
    this.setState({
      requestType,
    });
  },

  render() {
    const {
      data, error, disableButton, loading, query,
    } = this.state;

    return (
      <div className="_container _container_large">
        <Input
          text={DEFAULT_TEXT}
          url={DEFAULT_URL}
          error={error}
          language={data ? data.results.language : null}
          disableButton={disableButton}
          onSubmit={this.onSubmitClick}
          onTabChange={this.enableButton}
          onInputChange={this.enableButton}
          changeRequestType={this.changeRequestType}
        />
        <div id="anchor" style={{ marginTop: '0rem' }} />
        { !error ? (
          <Output
            loading={loading}
            data={data}
            query={query}
            language={data ? data.results.language : null}
          />) : null
        }
      </div>
    );
  },
});
