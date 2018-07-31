/*global Drupal forceStandingsYear */

const feeds = require('celtics-feeds');

function loadStandings(year) {
  jQuery.ajax({
    url: feeds.standings(year),
    async: false,
    success(standingsData) {
      for (let i = 0; i < standingsData.sta.co.length; i++) {
        for (let x = 0; x < standingsData.sta.co[i].di.length; x++) {
          for (let t = 0; t < standingsData.sta.co[i].di[x].t.length; t++) {
            const conferences = ['.east', '.west'];
            const place = standingsData.sta.co[i].di[x].t[t].see;
            let rowHTML = '';
            const index = ['see', 'w', 'l', 'gb', 'cr', 'dr', 'hr', 'ar', 'l10', 'str'];
            for (let o = 0; o < index.length; o++) {
              if (o === 0) {
                rowHTML += `
                  <td class="${standingsData.sta.co[i].di[x].t[t].ta}">
                    <p class="seed">${standingsData.sta.co[i].di[x].t[t].see}</p>
                    <div class="logo-wrap">
                      <img class="logo" src="https://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/${standingsData.sta.co[i].di[x].t[t].ta}.svg"/>
                    </div>
                    <p class="team-name">${standingsData.sta.co[i].di[x].t[t].tc.toUpperCase()} ${standingsData.sta.co[i].di[x].t[t].tn.toUpperCase()}</p>
                    <p class="team-abbreviation">${standingsData.sta.co[i].di[x].t[t].ta}</p>
                  </td>
                  `;
              } else {
                rowHTML += `<td>${standingsData.sta.co[i].di[x].t[t][index[o]]}</td>`;
              }
            }
            jQuery(`${conferences[i]} tr:nth-child(${place + 2})`).html(rowHTML);
            jQuery('tr').removeClass('active');

            if (standingsData.sta.co[i].di[x].t[t].ta === 'BOS') {
              jQuery(`${conferences[i]} tr:nth-child(${place + 2})`).addClass('active');
            }
          }
        }
      }
    },
  });
}

jQuery(document).ready(() => {
  let year = Drupal.settings.today.standings_season_year;
  if (typeof forceStandingsYear !== 'undefined') {
    year = forceStandingsYear;
  }
  loadStandings(year);
  for (let i = year; i > 2015; i--) {
    if (i === year) {
      jQuery('.season-select').append(`<option selected value="${i}">${i}-${i + 1} SEASON</option>`);
    } else {
      jQuery('.season-select').append(`<option value="${i}">${i}-${i + 1} SEASON</option>`);
    }
  }
  jQuery('.season-select').change(function() {
    loadStandings(jQuery(this).val());
  });
});
