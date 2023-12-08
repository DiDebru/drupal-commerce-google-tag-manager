/**
 * @file
 * Defines Javascript behaviors for the commerce_google_tag_manager module.
 */
(function (Drupal, drupalSettings, window) {
  Drupal.behaviors.datalayer_push = {
    attach: function (context, settings) {
      if (!drupalSettings) {
        return;
      }
      var cgtmSettings = drupalSettings.commerceGoogleTagManager || {};
      var url = cgtmSettings.eventsUrl;
      var dataLayerVariable = cgtmSettings.dataLayerVariable;
      if (!dataLayerVariable || !window.hasOwnProperty(dataLayerVariable)) {
        return;
      }
      var dataLayer = window[dataLayerVariable];
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data");
          }
        })
        .then((data) => {
          if (data && data.length) {
            data.forEach(function (eventData) {
              dataLayer.push(eventData);
            });
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  };
})(Drupal, drupalSettings, window);
