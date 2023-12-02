VERSION=v1-dev

reset:
	git tag -d ${VERSION} && \
	git add . && \
	git commit --amend --no-edit && \
	git tag -a -m "Testing release alpha 1" ${VERSION}
	git push origin main -f --follow-tags