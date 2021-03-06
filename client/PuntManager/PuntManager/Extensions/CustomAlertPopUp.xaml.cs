using System;
using Rg.Plugins.Popup.Pages;
using Rg.Plugins.Popup.Services;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace PuntManager.Extensions
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class CustomAlertPopUp : PopupPage
	{
        #region Attributes and Properties

        public static BindableProperty AlertTitleProperty =
            BindableProperty.Create("Title", typeof(string), typeof(ContentView), "Alert", BindingMode.OneWay);

        public static BindableProperty MessageProperty =
            BindableProperty.Create("Message", typeof(string), typeof(ContentView), null, BindingMode.OneWay);

        public static BindableProperty ButtonTextProperty =
            BindableProperty.Create("Button", typeof(string), typeof(ContentView), "OK", BindingMode.OneWay);

        public string AlertTitle
        {
            get { return (string)GetValue(AlertTitleProperty); }
            set { SetValue(AlertTitleProperty, value); }
        }

        public string Message
        {
            get { return (string)GetValue(MessageProperty); }
            set { SetValue(MessageProperty, value); }
        }

        public string ButtonText
        {
            get { return (string)GetValue(ButtonTextProperty); }
            set { SetValue(ButtonTextProperty, value); }
        }

        #endregion

        #region Events

        public event EventHandler ButtonClickedEvent;
        public event EventHandler DismissTappedEvent;

        #endregion

        public CustomAlertPopUp()
		{
			InitializeComponent();
            BindingContext = this;
		}

        public CustomAlertPopUp(string message, string title = "Alert", string button = "OK") : this() 
        {
            Message = message;
            AlertTitle = title;
            ButtonText = button;
        }


        void Dismiss_PopUp(object sender, EventArgs e)
        {
            OnDismissTappedEvent(EventArgs.Empty);
            PopupNavigation.Instance.PopAsync();
        }

        void ButtonClicked_PopUp(object sender, EventArgs e)
        {
            OnConfirmButtonClicked(EventArgs.Empty);
            PopupNavigation.Instance.PopAsync();
        }

        protected virtual void OnDismissTappedEvent(EventArgs e)
        {
            DismissTappedEvent?.Invoke(this, e);
        }

        protected virtual void OnConfirmButtonClicked(EventArgs e)
        {
            ButtonClickedEvent?.Invoke(this, e);
        }
    }
}