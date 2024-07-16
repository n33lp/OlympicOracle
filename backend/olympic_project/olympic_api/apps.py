from django.apps import AppConfig


class OlympicApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'olympic_api'

    def ready(self):
        from . import startup_script  # Import your startup script
        startup_script.startup()