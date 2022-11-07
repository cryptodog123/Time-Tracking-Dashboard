// Selectors:

const boxes = document.querySelectorAll(".inner-box");
const inner_box_arr = Array.from(boxes);
const allTimeFrames = document.querySelectorAll(".timeframe");
// Data that gets changed depending on time-frame

const totalTimeSpent = document.querySelector(".total-time-spent");

// USER CLICKS NEW TIME-FRAME
// CLEAR OLD MARKUP
// RENDER NEW MARKUP

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// RENDERING INITIAL MARKUP (WEEKLY TIMEFRAME)
////////////////////////////////////////////////////////

// const renderInitMarkup = async function () {
//   try {
//     const res = await fetch("data.json");
//     const data = await res.json();
//     console.log();
//   } catch (err) {
//     console.error(err);
//   }
// };

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

class ProfileDetails {
  // Current Timeframe
  #activeTimeFrame = "weekly";
  constructor() {
    // IMMEDIATELY GET DATA FROM FILE METHOD
    this._fetchMarkUp();
    document
      .querySelector(".timeframe-container")
      .addEventListener("click", this._timeFrameReset.bind(this));
  }

  async _fetchMarkUp() {
    try {
      // GET DATA FROM JSON FILE
      const res = await fetch("data.json");
      const data = await res.json();
      // SEND DATA TO GET PUT ON PAGE
      console.log(data);
      this._renderMarkup(data);
    } catch (err) {
      console.log(err);
    }
  }

  // USER CLICKS TIMEFRAME
  _timeFrameReset(e) {
    const target = e.target.closest(".timeframe");

    if (!target) return; // Guard clause
    if (this.#activeTimeFrame === target.innerHTML) return; // Guard clause

    allTimeFrames.forEach((timeframe) => timeframe.classList.remove("active"));
    target.classList.add("active");

    this.#activeTimeFrame = target.innerHTML.toLowerCase();
    this._clearMarkUp();
    this._fetchMarkUp();
  }

  _renderMarkup(data) {
    data.forEach((typeData, i) => {
      const { title, timeframes } = typeData;
      console.log(title);
      console.log(this.#activeTimeFrame);
      const item = timeframes[`${this.#activeTimeFrame}`];
      console.log(item);

      const html = `
        <div class="content-box">
        <div class="top-content">
          <p class="activity-type">${title}</p>
          <div class="edit-icon-outline">
          <svg class="edit-icon" width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        </div>
        <div class="bottom-content">
          <p class="time-spent">
            <span class="total-time-spent">${item.current}</span>hrs
          </p>
          <p class="time-spent-last-week">
            <span class="previous-time-frame">${this._findTimeFrame()}</span> -
            <span class="previous-dataa">${item.previous}</span>hrs
          </p>
        </div>
      </div>
      `;

      inner_box_arr[i].insertAdjacentHTML("afterbegin", html);
    });
  }

  _findTimeFrame() {
    if (this.#activeTimeFrame === "weekly") return "Last Week";
    if (this.#activeTimeFrame === "daily") return "Yesterday";
    if (this.#activeTimeFrame === "monthly") return "LastMonth";
  }

  _clearMarkUp() {
    inner_box_arr.forEach((box) => (box.innerHTML = ""));
  }
}

const Jeremy = new ProfileDetails();
