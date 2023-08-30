from Frontend.Components.energy_component import EnergyComponent
from Frontend.Components.load_component import LoadComponent
from Frontend.Components.input_component import InputComponent


def main():
    input_component = InputComponent()
    input_component.show()

    energy_component = EnergyComponent(input_component)
    energy_component.show()

    load_component = LoadComponent(input_component)
    load_component.show()


if __name__ == "__main__":
    main()
