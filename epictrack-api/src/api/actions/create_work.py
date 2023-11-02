"""Disable work start date action handler"""

from api.actions.base import ActionFactory
from api.models.event import Event


class CreateWork(ActionFactory):  # pylint: disable=too-few-public-methods
    """Create a new work based on the current project and other parameters"""

    def run(self, source_event: Event, params: dict) -> None:
        """Performs the required operations"""
        return

    def get_additional_params(self, params):
        """Returns additional parameter"""
        return params