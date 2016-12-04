"use strict";
var core_1 = require('@angular/core');
var TreeNodeDropSlot = (function () {
    function TreeNodeDropSlot() {
    }
    TreeNodeDropSlot.prototype.onDrop = function ($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    };
    TreeNodeDropSlot.prototype.allowDrop = function (element) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex });
    };
    TreeNodeDropSlot.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'TreeNodeDropSlot',
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: [
                        '.node-drop-slot { display: block; height: 2px; width: 100%}',
                        '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
                    ],
                    template: "\n    <div\n      class=\"node-drop-slot\"\n      (treeDrop)=\"onDrop($event)\"\n      [treeAllowDrop]=\"allowDrop.bind(this)\">\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeNodeDropSlot.ctorParameters = [];
    TreeNodeDropSlot.propDecorators = {
        'node': [{ type: core_1.Input },],
        'dropIndex': [{ type: core_1.Input },],
    };
    return TreeNodeDropSlot;
}());
exports.TreeNodeDropSlot = TreeNodeDropSlot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQW9ELGVBQWUsQ0FBQyxDQUFBO0FBS3BFO0lBSUU7SUFDQSxDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7U0FDakQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxPQUFPO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUNJLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUU7d0JBQ04sNkRBQTZEO3dCQUM3RCxrR0FBa0c7cUJBQ25HO29CQUNELFFBQVEsRUFBRSxrSkFNVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBNkQsRUFDakYsQ0FBQztJQUNLLCtCQUFjLEdBQTJDO1FBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQzFCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO0tBQzlCLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksd0JBQWdCLG1CQXlDNUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVEcm9wU2xvdCB7XG4gICBub2RlOiBUcmVlTm9kZTtcbiAgIGRyb3BJbmRleDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgb25Ecm9wKCRldmVudCkge1xuICAgIHRoaXMubm9kZS5tb3VzZUFjdGlvbignZHJvcCcsICRldmVudC5ldmVudCwge1xuICAgICAgZnJvbTogJGV2ZW50LmVsZW1lbnQsXG4gICAgICB0bzogeyBwYXJlbnQ6IHRoaXMubm9kZSwgaW5kZXg6IHRoaXMuZHJvcEluZGV4IH1cbiAgICB9KTtcbiAgfVxuXG4gIGFsbG93RHJvcChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5vcHRpb25zLmFsbG93RHJvcChlbGVtZW50LCB7IHBhcmVudDogdGhpcy5ub2RlLCBpbmRleDogdGhpcy5kcm9wSW5kZXggfSk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZURyb3BTbG90JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXG4gICAgJy5ub2RlLWRyb3Atc2xvdCB7IGRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDJweDsgd2lkdGg6IDEwMCV9JyxcbiAgICAnLm5vZGUtZHJvcC1zbG90LmlzLWRyYWdnaW5nLW92ZXIgeyBiYWNrZ3JvdW5kOiAjZGRmZmVlOyBoZWlnaHQ6IDIwcHg7IGJvcmRlcjogMnB4IGRvdHRlZCAjODg4OyB9J1xuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibm9kZS1kcm9wLXNsb3RcIlxuICAgICAgKHRyZWVEcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCJcbiAgICAgIFt0cmVlQWxsb3dEcm9wXT1cImFsbG93RHJvcC5iaW5kKHRoaXMpXCI+XG4gICAgPC9kaXY+XG4gIGBcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ2Ryb3BJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==