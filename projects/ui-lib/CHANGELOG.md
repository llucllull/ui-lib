# Changelog

All notable changes to this project will be documented in this file.

## [0.22.11] - 2026-04-23
### Added
- update layout and styles for category-progress, contact-minimal, section-intro, and split-previewer components

## [0.22.10] - 2026-04-21
### Added
- add split-previewer tests

## [0.22.9] - 2026-04-16
### Added
- add aria-label to header buttons

## [0.22.8] - 2026-04-16
### Changed
- fix height on contact-minimal image

## [0.22.7] - 2026-04-16
### Changed
- enhance image loading attributes for contact-minimal and split-previewer components

## [0.22.6] - 2026-04-16
### Changed
- adjust img responsive positioning on contact-minimal

## [0.22.5] - 2026-04-16
### Changed
- adjust img styles on contact-minimal

## [0.22.4] - 2026-04-14
### Changed
- fix scrollReveal errors on SSG contexts
- undo splitPreviewer style changes

## [0.22.3] - 2026-04-14
### Changed
- fix scrollReveal errors on SSG contexts

## [0.22.2] - 2026-04-14
### Added
- add contact-minimal tests

## [0.22.1] - 2026-04-14
### Changed
- adjust grid on responsive

## [0.22.0] - 2026-04-13
### Added
- add responsive grid architecture and column utilities
- add column and start system on grid

### Changed
- adjust components with grid changes

## [0.21.0] - 2026-04-13
### Added
- create scrollReveal directive
- add scrollReveal to all content components

## [0.20.0] - 2026-04-13
### Added
- add contact minimal component

## [0.19.3] - 2026-04-01
### Changed
- adjust font-size on navmodal on responsive devices

## [0.19.2] - 2026-04-01
### Changed
- change item styles on categoryProgress

## [0.19.1] - 2026-03-30
### Changed
- handle undefined router URL in getCurrentLang
- set default width in ScreenSizerService

## [0.19.0] - 2026-03-30
### Added
- add tag color and background variables to dark and light themes
- add split previewer component with styles, tests, and mappers

## [0.18.4] - 2026-03-27
### Added
- create layout-padding

### Changed
- refactor styles from category-progress
- update styles folders and reorganize variables to handle layout padding

## [0.18.3] - 2026-03-27
### Changed
- update button of sectionIntro
- fix icon on sectionIntro test

## [0.18.2] - 2026-03-27
### Added
- add 404 test

### Changed
- refactor icon buttons on navModal, heroSection, 404
- update common button styles to handle ui-icons
- update herosection, navModal tests

## [0.18.1] - 2026-03-27
### Added
- add styles btn-header
- add btn-header to theme styles

### Changed
- update header buttons
- remove theme from headers tests
- update headers tests

## [0.18.0] - 2026-03-22
### Added
- add new global class to handle btn groups
- add highlight directive

### Changed
- update nav-modal tests

## [0.17.3] - 2026-03-22
### Changed
- update styles wave on hero-section

## [0.17.2] - 2026-03-22
### Changed
- update styles 404 page

## [0.17.1] - 2026-03-22
### Added
- add --font-title-home to style variables

### Changed
- change styles on heroSection font
- improve styles on responsive on modals

## [0.17.0] - 2026-03-22
### Changed
- refactor all injects and locate them on constructors

## [0.16.2] - 2026-03-22
### Changed
- undo changes on deploy script

## [0.16.1] - 2026-03-22
### Changed
- change sourceRoot to handle testing

## [0.16.0] - 2026-03-17
### Added
- define enums as secondary entry point
- add paths to secondary entry points
- move effects, sliders, interfaces, directives, services, utils, components and enums outside src to generate the secondary entry points

### Changed
- update deploy script

## [0.15.2] - 2026-03-17
### Changed
- rename Enum directory
- remove enum and effects from public-api

## [0.15.1] - 2026-03-17
### Added
- add icon mock to run test

### Changed
- refactor ui-icon component without icon.module
- exclude '.stories.ts' and '.d.ts' from build
- refactor socialFooter tests to handle icon mock

### Removed
- remove icon module

## [0.15.0] - 2026-03-13
### Added
- add 404 component with styles, template, and tests

## [0.14.2] - 2026-03-13
### Changed
- update mapButtons util to handle all available linktypes
- refactor linkType directive to handle all available linktypes

## [0.14.1] - 2026-03-11
### Added
- update github workflows with npm OIDC github actions

## [0.14.0] - 2026-03-09
### Added
- migrate to Angular 19
- add package.json to effects and sliders ng-packages

### Changed
- fix import swiper on link/social footers test
- remove dynamic-background tests
- update test script on package.json
- update deploy github actions

## [0.13.0] - 2026-03-09
### Added
- add CDN_BASE_URL injection token and update image mapping logic
- add dynamic background component with effects and swiper directive to its own ng-package
- add missing sass:map import in _mixins.scss
- implement language mapping in HeaderMobileComponent for improved navigation

### Changed
- reorder import statements in social-footer component for clarity
- correct syntax for map functions in _mixins.scss
- restore allowedNonPeerDependencies in ng-package.json
- reorganize package.json dependencies for clarity and consistency
- update component mappers to include CDN support and refactor mapping functions
- refactor UiIconComponent to use dynamic icon resolution and remove hardcoded brand icons
- update lang-modal component and mapper for improved language selection and mapping
- enhance header-clear and nav-modal components for improved navigation and language handling
- simplify internal navigation by removing URL cleanup in LinkTypeDirective

## [0.12.5] - 2025-10-29
### Added
- add format command scripts to package.json

### Changed
- format all files

## [0.12.4] - 2025-10-29
### Added
- add prettier config and plugins setup

## [0.12.3] - 2025-10-23
### Added
- fixes branches

## [0.12.2] - 2025-10-23
### Added
- refactor components folder and split contents

## [0.12.1] - 2025-09-02
### Added
- Update dynamic-background component
- Update dynamic-background stories
- Add dynamic effects with SphereDeformEffect and registry

## [0.12.0] - 2025-09-01
### Added
- Import three.js
- Add dynamic-background component
- Add stories for dynamic-background component
- Add /effects import to public-api

## [0.11.0] - 2025-08-28
### Added
- Add unit tests for ui-lib components
- Add unit tests step to CI workflow

## [0.10.2] - 2025-08-27
### Added
- Fix LinkTypeDirective import

## [0.10.1] - 2025-08-27
### Added
- Fix UiIcon import

## [0.10.0] - 2025-08-26
### Added
- Add UiLibAddres interface
- Add visual-footer component
- Add stories for social-footer
- Add mapper for social-footer
- Update light color styles

## [0.9.2] - 2025-08-26
### Added
- Fix display lucide icons
- Update styles for social-footer
- Add new color variables for footer arrows

## [0.9.1] - 2025-08-26
### Added
- Update styles for Storybook

## [0.9.0] - 2025-08-25
### Added
- Import swiper.js + create swiper directive
- Add social-footer component
- Add stories for social-footer
- Add mapper for social-footer
- Import Lucide + create icon module
- Import SimpleIcons
- Create Ui Icon shared component

## [0.8.0] - 2025-08-23
### Added
- Add legal-footer component
- Add stories for legal-footer
- Add mapper for legal-footer
- Add footer color variables for themes

## [0.7.0] - 2025-08-23
### Added
- Add links-footer component
- Add stories for links-footer
- Add mapper for links-footer

## [0.6.0] - 2025-08-23
### Added
- Add deploy for Storybook

## [0.5.2] - 2025-08-14
### Added
- Add optionallity to icon
- Change font-size for btn-link
- Add stories for category-progress and section-intro
- Update story for header-clear

## [0.5.1] - 2025-08-14
### Added
- Update font-size on hero-section component
- Update modal item styles and introduce new font variables
- Add social items support to header and nav modal components

## [0.5.0] - 2025-08-14
### Added
- Add variables for theme color handle
- Theme toggle functionality in header components
- Add theme service for managing light and dark themes
- Change logo depending on the theme

## [0.4.5] - 2025-08-14
### Added
- Fix styles hero-section
- Update color variables for header and buttons
- Add home link functionality to header components
- Update styles for modals

## [0.4.4] - 2025-08-13
### Added
- Update imports for ui-lib
- Add animation highlight to hero-section component

## [0.4.3] - 2025-08-13
### Added
- Fix style from close-btn in modals
- Add pretitle to hero-section component
- Update styles from hero-section

## [0.4.2] - 2025-08-11
### Added
- Update styles for lang and nav modals
- Refactor CSS variables for consistency across components
- Add button icon to hero-section component
- Update btn-link common styles

## [0.4.1] - 2025-08-11
### Added
- Update mapImage function
- Add logo to headers

## [0.4.0] - 2025-07-31
### Added
- Add new component CategoryProgress
- Add mapper for CategoryProgress

## [0.3.0] - 2025-07-29
### Added
- Add new component SectionIntro
- Add mapper for SectionIntro
- Create typography styles file

## [0.2.3] - 2025-07-29
### Added
- Enhance deploy script with CSS compilation and validation
- Change styles for HeroSection

## [0.2.2] - 2025-07-28
### Added
- Update package.json and workflows for style building and publishing

## [0.2.1] - 2025-07-28
### Added
- Add HeaderMobile component
- Create screenSizer service
- Update mixins functions
- Restructure SCSS files and introduce new styles
- Update Storybook configuration

## [0.2.0] - 2025-07-28
### Added
- Integration of Storybook with configuration and documentation
- Add HeroSection component stories for Storybook
- Add global, common, variables, breakpoints and mixins styles
- Create styles for HeroSection component
- Create styles for HeaderClear component

## [0.1.6] - 2025-07-23
### Added
- Add nav-modal functionalities

## [0.1.5] - 2025-07-22
### Added
- Add new imports from new interfaces

## [0.1.4] - 2025-07-22
### Added
- Update 'lang-modal' component and mapper

## [0.1.3] - 2025-07-20
### Added
- Create 'header-clear', 'lang-modal' and 'nav-modal' components
- Update PageComponent interface
- Create NavItems interface
- Create 'header-clear', 'lang-modal' and 'nav-modal' mappers

## [0.1.2] - 2025-07-12
### Added
- Rename 'top-slider' to 'hero-section'
- Add utils functions and interfaces for buttons and images
- Edit Prettier formatter
- Create linkType directive + enum
- Code and map hero-section

## [0.1.1] - 2025-07-10
### Added
- Fix deploy script command

## [0.1.0] - 2025-07-10
### Added
- MapperService`: logic to dynamically map components by name and props.
- Individual mapper structure (`component-mappers/`) to easily scale components.
- BodyComponent<T>` and other interfaces centralised in the library.
- SSR compatibility preparation (use of `PLATFORM_ID`).
- Base configuration to consume interfaces and services from external apps (e.g. `portfolio`).

## [0.0.2] - 2025-07-01
### Added
- First basic component generated in the `ui-lib` library.
