from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='dc', description='DC superheroes')

        # Users
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='marvel', is_superhero=True),
            User(email='captain@marvel.com', name='Captain America', team='marvel', is_superhero=True),
            User(email='spiderman@marvel.com', name='Spider-Man', team='marvel', is_superhero=True),
            User(email='batman@dc.com', name='Batman', team='dc', is_superhero=True),
            User(email='superman@dc.com', name='Superman', team='dc', is_superhero=True),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team='dc', is_superhero=True),
        ]
        User.objects.bulk_create(users)

        # Activities
        activities = [
            Activity(user='ironman@marvel.com', activity_type='run', duration=30, date='2024-04-01'),
            Activity(user='captain@marvel.com', activity_type='cycle', duration=45, date='2024-04-02'),
            Activity(user='spiderman@marvel.com', activity_type='swim', duration=25, date='2024-04-03'),
            Activity(user='batman@dc.com', activity_type='run', duration=40, date='2024-04-01'),
            Activity(user='superman@dc.com', activity_type='cycle', duration=50, date='2024-04-02'),
            Activity(user='wonderwoman@dc.com', activity_type='swim', duration=35, date='2024-04-03'),
        ]
        Activity.objects.bulk_create(activities)

        # Leaderboard
        Leaderboard.objects.create(team='marvel', points=300)
        Leaderboard.objects.create(team='dc', points=320)

        # Workouts
        workouts = [
            Workout(name='Pushups', description='Do 20 pushups', difficulty='easy'),
            Workout(name='Situps', description='Do 30 situps', difficulty='easy'),
            Workout(name='Pullups', description='Do 10 pullups', difficulty='medium'),
            Workout(name='Squats', description='Do 40 squats', difficulty='medium'),
            Workout(name='Burpees', description='Do 15 burpees', difficulty='hard'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
