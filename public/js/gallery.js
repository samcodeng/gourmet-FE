(function () {
  (function () {
    var logo, logo_css;
    logo =
      '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>codepen-logo</title><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zM7.139 21.651l1.35-1.35a.387.387 0 0 0 0-.54l-3.49-3.49a.387.387 0 0 0-.54 0l-1.35 1.35a.39.39 0 0 0 0 .54l3.49 3.49a.38.38 0 0 0 .54 0zm6.922.153l2.544-2.543a.722.722 0 0 0 0-1.018l-6.582-6.58a.722.722 0 0 0-1.018 0l-2.543 2.544a.719.719 0 0 0 0 1.018l6.58 6.579c.281.28.737.28 1.019 0zm14.779-5.85l-7.786-7.79a.554.554 0 0 0-.788 0l-5.235 5.23a.558.558 0 0 0 0 .789l7.79 7.789c.216.216.568.216.785 0l5.236-5.236a.566.566 0 0 0 0-.786l-.002.003zm-3.89 2.806a.813.813 0 1 1 0-1.626.813.813 0 0 1 0 1.626z" fill="#FFF" fill-rule="evenodd"/></svg>';
    logo_css =
      ".mM{display:block;border-radius:50%;box-shadow:0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);position:fixed;bottom:1em;right:1em;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transition:all 240ms ease-in-out;transition:all 240ms ease-in-out;z-index:9999;opacity:0.75}.mM svg{display:block}.mM:hover{opacity:1;-webkit-transform:scale(1.125);transform:scale(1.125)}";
    document.head.insertAdjacentHTML(
      "beforeend",
      "<style>" + logo_css + "</style>"
    );
    document.body.insertAdjacentHTML(
      "beforeend",
      '<a href="https://codepen.io/mican/" target="_blank" class="mM">' +
        logo +
        "</a>"
    );
  })();

  $(".gallery-link").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: "mfp-with-zoom mfp-img-mobile",
    image: {
      verticalFit: true,
      titleSrc: function (item) {
        return item.el.find("figcaption").text() || item.el.attr("title");
      },
    },
    zoom: {
      enabled: true,
    },
    // duration: 300
    gallery: {
      enabled: true,
      navigateByImgClick: false,
      tCounter: "",
    },
    disableOn: function () {
      return $(window).width() > 640;
    },
  });
}.call(this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBRyxDQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQ0gsUUFBQSxJQUFBLEVBQUE7SUFBRSxJQUFBLEdBQU87SUFDUCxRQUFBLEdBQVc7SUFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFkLENBQWlDLFdBQWpDLEVBQThDLFNBQUEsR0FBWSxRQUFaLEdBQXVCLFVBQXJFO0lBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBZCxDQUFpQyxXQUFqQyxFQUE4QyxpRUFBQSxHQUFvRSxJQUFwRSxHQUEyRSxNQUF6SDtFQUpDLENBQUE7O0VBTUgsQ0FBQSxDQUFFLGVBQUYsQ0FBa0IsQ0FBQyxhQUFuQixDQUNFO0lBQUEsSUFBQSxFQUFNLE9BQU47SUFDQSxtQkFBQSxFQUFxQixJQURyQjtJQUVBLGNBQUEsRUFBZ0IsS0FGaEI7SUFHQSxTQUFBLEVBQVcsOEJBSFg7SUFJQSxLQUFBLEVBQ0U7TUFBQSxXQUFBLEVBQWEsSUFBYjtNQUNBLFFBQUEsRUFBVSxRQUFBLENBQUMsSUFBRCxDQUFBO2VBQ1IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFSLENBQWEsWUFBYixDQUEwQixDQUFDLElBQTNCLENBQUEsQ0FBQSxJQUFxQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQVIsQ0FBYSxPQUFiO01BRDdCO0lBRFYsQ0FMRjtJQVFBLElBQUEsRUFDRTtNQUFBLE9BQUEsRUFBUztJQUFULENBVEY7O0lBV0EsT0FBQSxFQUNFO01BQUEsT0FBQSxFQUFTLElBQVQ7TUFDQSxrQkFBQSxFQUFvQixLQURwQjtNQUVBLFFBQUEsRUFBVTtJQUZWLENBWkY7SUFlQSxTQUFBLEVBQVcsUUFBQSxDQUFBLENBQUE7YUFDVCxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsS0FBVixDQUFBLENBQUEsR0FBb0I7SUFEWDtFQWZYLENBREY7QUFOQSIsInNvdXJjZXNDb250ZW50IjpbImRvIC0+XG4gIGxvZ28gPSAnPHN2ZyB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjx0aXRsZT5jb2RlcGVuLWxvZ288L3RpdGxlPjxwYXRoIGQ9XCJNMTYgMzJDNy4xNjMgMzIgMCAyNC44MzcgMCAxNlM3LjE2MyAwIDE2IDBzMTYgNy4xNjMgMTYgMTYtNy4xNjMgMTYtMTYgMTZ6TTcuMTM5IDIxLjY1MWwxLjM1LTEuMzVhLjM4Ny4zODcgMCAwIDAgMC0uNTRsLTMuNDktMy40OWEuMzg3LjM4NyAwIDAgMC0uNTQgMGwtMS4zNSAxLjM1YS4zOS4zOSAwIDAgMCAwIC41NGwzLjQ5IDMuNDlhLjM4LjM4IDAgMCAwIC41NCAwem02LjkyMi4xNTNsMi41NDQtMi41NDNhLjcyMi43MjIgMCAwIDAgMC0xLjAxOGwtNi41ODItNi41OGEuNzIyLjcyMiAwIDAgMC0xLjAxOCAwbC0yLjU0MyAyLjU0NGEuNzE5LjcxOSAwIDAgMCAwIDEuMDE4bDYuNTggNi41NzljLjI4MS4yOC43MzcuMjggMS4wMTkgMHptMTQuNzc5LTUuODVsLTcuNzg2LTcuNzlhLjU1NC41NTQgMCAwIDAtLjc4OCAwbC01LjIzNSA1LjIzYS41NTguNTU4IDAgMCAwIDAgLjc4OWw3Ljc5IDcuNzg5Yy4yMTYuMjE2LjU2OC4yMTYuNzg1IDBsNS4yMzYtNS4yMzZhLjU2Ni41NjYgMCAwIDAgMC0uNzg2bC0uMDAyLjAwM3ptLTMuODkgMi44MDZhLjgxMy44MTMgMCAxIDEgMC0xLjYyNi44MTMuODEzIDAgMCAxIDAgMS42MjZ6XCIgZmlsbD1cIiNGRkZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPidcbiAgbG9nb19jc3MgPSAnLm1Ne2Rpc3BsYXk6YmxvY2s7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7cG9zaXRpb246Zml4ZWQ7Ym90dG9tOjFlbTtyaWdodDoxZW07LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJSA1MCU7dHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgMjQwbXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjphbGwgMjQwbXMgZWFzZS1pbi1vdXQ7ei1pbmRleDo5OTk5O29wYWNpdHk6MC43NX0ubU0gc3Zne2Rpc3BsYXk6YmxvY2t9Lm1NOmhvdmVye29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEyNSk7dHJhbnNmb3JtOnNjYWxlKDEuMTI1KX0nXG4gIGRvY3VtZW50LmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MICdiZWZvcmVlbmQnLCAnPHN0eWxlPicgKyBsb2dvX2NzcyArICc8L3N0eWxlPidcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwgJ2JlZm9yZWVuZCcsICc8YSBocmVmPVwiaHR0cHM6Ly9jb2RlcGVuLmlvL21pY2FuL1wiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwibU1cIj4nICsgbG9nbyArICc8L2E+J1xuICByZXR1cm5cbiQoJy5nYWxsZXJ5LWxpbmsnKS5tYWduaWZpY1BvcHVwXG4gIHR5cGU6ICdpbWFnZSdcbiAgY2xvc2VPbkNvbnRlbnRDbGljazogdHJ1ZVxuICBjbG9zZUJ0bkluc2lkZTogZmFsc2VcbiAgbWFpbkNsYXNzOiAnbWZwLXdpdGgtem9vbSBtZnAtaW1nLW1vYmlsZSdcbiAgaW1hZ2U6IFxuICAgIHZlcnRpY2FsRml0OiB0cnVlXG4gICAgdGl0bGVTcmM6IChpdGVtKSAtPlxuICAgICAgaXRlbS5lbC5maW5kKCdmaWdjYXB0aW9uJykudGV4dCgpIHx8IGl0ZW0uZWwuYXR0cigndGl0bGUnKVxuICB6b29tOlxuICAgIGVuYWJsZWQ6IHRydWVcbiAgICAjIGR1cmF0aW9uOiAzMDBcbiAgZ2FsbGVyeTpcbiAgICBlbmFibGVkOiB0cnVlXG4gICAgbmF2aWdhdGVCeUltZ0NsaWNrOiBmYWxzZVxuICAgIHRDb3VudGVyOiAnJ1xuICBkaXNhYmxlT246IC0+XG4gICAgJCh3aW5kb3cpLndpZHRoKCkgPiA2NDAgIl19
//# sourceURL=coffeescript
