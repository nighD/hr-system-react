export default {
    items: [
      {
        name: 'Dashboard',
        url: '/admindashboard',
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
        title: true,
        name: 'Attendance',
        wrapper: {
          element: '',
          attributes: {},
        },
        class: ''
      },
      {
        name: 'Callendar',
        url: '/admcalendar',
        icon: 'fa fa-calendar-check-o',
      },
      {
        name: 'Detail',
        url: '/att_calendar',
        icon: 'fa fa-calendar-o',
      },
      {
        title: true,
        name: 'Leave',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'List',
        url: '/leave',
        icon: 'fa fa-list-alt',
        children: [
          {
            name: 'All',
            url: '/leavelist',
            icon: 'fa fa-list-alt',
          }
        ],
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
  