export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
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
        name: 'Team Information',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Team Detail',
        url: '/teamdetail',
        icon: 'fa fa-users',
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
        url: '/calendar',
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
        name: 'Leave Detail',
        url: '/leave_detail',
        icon: 'fa fa-sticky-note',
      },
      {
        name: 'Request Leave',
        url: '/leave_request',
        icon: 'fa fa-sticky-note-o',
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
        name: 'List',
        url: '/perfor_list',
        icon: 'fa fa-list-alt',
      },
      {
        name: 'Detail',
        url: '/perfor_detail',
        icon: 'cui-list',
      },
      {
        name: 'Update Process',
        url: '/perfor_update',
        icon: 'fa fa-pencil',
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
        url: '/payroll_sum',
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
  