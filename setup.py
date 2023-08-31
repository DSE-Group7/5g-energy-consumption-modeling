import setuptools

with open('README.md', 'r', encoding='utf-8') as f:
    long_description = f.read()


__version__ = '0.0.0'

REPO_NAME = '5g-energy-consumption-modelings'
AUTHOR_USER_NAME = 'Nadil-K'
SRC_REPO = '5g-energy-consumption-modelings'
AUTHOR_EMAIL = 'samithkarunathilake@gmail.com'
MY_NAME = 'samithkavishke'

setuptools.setup(
    name=SRC_REPO,
    version=__version__,
    author=MY_NAME,
    author_email=AUTHOR_EMAIL,
    description='This is the DSE Project 07',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url=f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}",
    project_urls={
        "Bug Tracker": f"https://github.com/{AUTHOR_USER_NAME}/{REPO_NAME}/issues",
    },
    package_dir={'': ''},
    packages=setuptools.find_packages(),
)
