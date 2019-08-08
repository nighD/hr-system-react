export default {
    items: [
      {
        title: true,
        name: 'Dashboard',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Attrition Visualization',
        url: '/data_visualization_attrition',
        icon: 'fa fa-area-chart',
        badge: {
        },
      },
      {
        name: 'Fraud Visualization',
        url: '/data_visualization_fraud',
        icon: 'fa fa-line-chart',
        badge: {
        },
      },
      {
        name: 'Data Report',
        url: '/data_report',
        icon: 'icon-speedometer',
        badge: {
        },
      },
      {
        title: true,
        name: 'Personal Information',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Detail',
        url: '/detail',
        icon: 'fa fa-user',
      },
      {
        title: true,
        name: 'List',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Employee List',
        url: '/employeelist',
        icon: 'fa fa-users',
      },
      {
        name: 'Team List',
        url: '/teamlist',
        icon: 'cui-layers',
      },
      {
        name: 'Leave List',
        url: '/leavelist',
        icon: 'fa fa-list-alt',
      },
      {
        title: true,
        name: 'Calendar',
        wrapper: {
          element: '',
          attributes: {},
        },
        class: ''
      },
      {
        name: 'Event',
        url: '/admcalendar',
        icon: 'fa fa-calendar-check-o',
      },
      {
        title: true,
        name: 'Performance',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Search',
        url: '/perfor_search',
        icon: 'fa fa-search',
      },
      {
        title: true,
        name: 'Payroll',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Summary',
        url: '/run_payroll',
        icon: 'icon-wallet',
      },
      {
        name: 'Detail',
        url: '/payroll_detail',
        icon: 'fa fa-money',
      },
      {
        name: 'Calculation',
        url: '/payroll_cal',
        icon: 'fa fa-calculator',
      },
    ],
  };
  