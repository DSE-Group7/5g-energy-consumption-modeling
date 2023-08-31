from Frontend.Components.energy_component import EnergyComponent
from Frontend.Components.load_component import LoadComponent
from Frontend.Components.input_component import InputComponent
from Frontend.Components.ranking_component import RankingComponent
from Frontend.Components.info_component import InfoComponent
from Frontend.Components.alert_component import AlertComponent


def main():
    input_component = InputComponent()
    input_component.show()
    
    info_component = InfoComponent(input_component)
    info_component.show()

    energy_component = EnergyComponent(input_component)
    energy_component.show()

    load_component = LoadComponent(input_component)
    load_component.show()

    ranking_component = RankingComponent()
    ranking_component.show()

    alert_component = AlertComponent()
    alert_component.show()


def trial():
    from st_on_hover_tabs import on_hover_tabs
    import streamlit as st
    st.set_page_config(layout="wide")

    st.header("Custom tab component for on-hover navigation bar")
    st.markdown('<style>' + open('./style.css').read() +
                '</style>', unsafe_allow_html=True)

    with st.sidebar:
        tabs = on_hover_tabs(tabName=['Dashboard', 'Money', 'Economy'],
                             iconName=['dashboard', 'money', 'economy'], default_choice=0)

    if tabs == 'Dashboard':
        st.title("Navigation Bar")
        st.write('Name of option is {}'.format(tabs))

    elif tabs == 'Money':
        st.title("Paper")
        st.write('Name of option is {}'.format(tabs))

    elif tabs == 'Economy':
        st.title("Tom")
        st.write('Name of option is {}'.format(tabs))


if __name__ == "__main__":
    # trial()
    main()
